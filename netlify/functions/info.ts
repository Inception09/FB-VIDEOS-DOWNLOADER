import { Handler } from "@netlify/functions";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const parseString = (str: string) => {
    try {
        return JSON.parse(`{"text": "${str}"}`).text;
    } catch {
        return str;
    }
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { url } = body;

    if (!url) {
      return { statusCode: 400, body: JSON.stringify({ error: "URL is required" }) };
    }

    const generateRandomCookieValue = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
        let result = '';
        for (let i = 0; i < 24; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const headers = {
      "sec-fetch-user": "?1",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-site": "none",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "cache-control": "max-age=0",
      authority: "www.facebook.com",
      "upgrade-insecure-requests": "1",
      "accept-language": "en-GB,en;q=0.9,tr-TR;q=0.8,tr;q=0.7,en-US;q=0.6",
      "sec-ch-ua": '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      cookie: `sb=${generateRandomCookieValue()}; datr=${generateRandomCookieValue()};`
    };

    let responseData = "";
    try {
        const response = await axios.get(url, { headers, timeout: 15000 });
        responseData = response.data;
    } catch (err: any) {
        throw new Error("Unable to reach Facebook. " + err.message);
    }

    let data = responseData.replace(/&quot;/g, '"').replace(/&amp;/g, "&");

    const sdMatch = data.match(/"browser_native_sd_url":"(.*?)"/) || data.match(/"playable_url":"(.*?)"/) || data.match(/sd_src\s*:\s*"([^"]*)"/) || data.match(/(?<="src":")[^"]*(https:\/\/[^"]*)/);
    const hdMatch = data.match(/"browser_native_hd_url":"(.*?)"/) || data.match(/"playable_url_quality_hd":"(.*?)"/) || data.match(/hd_src\s*:\s*"([^"]*)"/);
    const titleMatch = data.match(/<meta\sname="description"\scontent="(.*?)"/);
    const thumbMatch = data.match(/"preferred_thumbnail":{"image":{"uri":"(.*?)"/);
    const duration = data.match(/"playable_duration_in_ms":[0-9]+/gm);

    if (!sdMatch || !sdMatch[1]) {
        throw new Error("Cannot parse video data. The video might be private or Facebook changed their layout.");
    }

    const duration_ms = duration && duration[0] ? Number(duration[0].split(":")[1]) : 0;
    const sdUrl = parseString(sdMatch[1]);
    const hdUrl = hdMatch && hdMatch[1] ? parseString(hdMatch[1]) : "";
    const title = titleMatch && titleMatch[1] ? parseString(titleMatch[1]) : (data.match(/<title>(.*?)<\/title>/)?.[1] ?? "Facebook Video");
    const thumbnail = thumbMatch && thumbMatch[1] ? parseString(thumbMatch[1]) : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1024px-2021_Facebook_icon.svg.png";

    const getFileSize = async (url: string) => {
        try {
            const res = await axios.head(url, { timeout: 3000 });
            const len = res.headers['content-length'];
            return len ? parseInt(String(len), 10) : undefined;
        } catch {
            return undefined;
        }
    };

    const sdSize = await getFileSize(sdUrl);
    const hdSize = hdUrl ? await getFileSize(hdUrl) : undefined;

    const formats = [];
    
    // Always insert best available first as the UI expects it
    const bestUrl = hdUrl || sdUrl;
    formats.push({
        format_id: "best",
        ext: "mp4",
        resolution: "🔥 Best Available Quality (Direct)",
        url: bestUrl,
        filesize: hdUrl ? hdSize : sdSize,
        is_split: false
    });

    if (hdUrl) {
        formats.push({
            format_id: "hd",
            ext: "mp4",
            resolution: "HD Quality (720p+)",
            url: hdUrl,
            filesize: hdSize,
            is_split: false
        });
    }
    
    formats.push({
        format_id: "sd",
        ext: "mp4",
        resolution: "SD Quality (Basic)",
        url: sdUrl,
        filesize: sdSize,
        is_split: false
    });

    const metadata = {
      id: uuidv4(),
      title: title,
      thumbnail: thumbnail,
      duration: Math.floor(duration_ms / 1000),
      uploader: "Facebook User",
      formats: formats,
      webpage_url: url
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metadata),
    };
  } catch (error: any) {
    console.error("Info error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Unknown error" }),
    };
  }
};
