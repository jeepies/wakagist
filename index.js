import "dotenv/config";
import { WakaClient } from "wakaclient";
import { Octokit } from "@octokit/rest";

const { GIST_ID, GH_PAT, WAKATIME_KEY } = process.env;

if (!GIST_ID || !GH_PAT || !WAKATIME_KEY)
  throw new Error(`environment variables are not set. please read the README`);

const wakaClient = new WakaClient(WAKATIME_KEY);
const octoClient = new Octokit({ auth: `token ${GH_PAT}` });

const removeUnknown = (arr) => arr.filter((item) => item.name !== "Other");

async function job() {
  const {
    data: {
      human_readable_total_including_other_language,
      languages,
      editors,
      operating_systems,
      human_readable_range,
    },
  } = await wakaClient.getStats();

  const topLanguage = removeUnknown(languages)[0];
  const topEditor = removeUnknown(editors)[0];
  const topOperatingSystem = removeUnknown(operating_systems)[0];

  const LINES = [
    `Total Time Coding: ${human_readable_total_including_other_language}`,
    `Most Used Language: ${topLanguage.name} (${topLanguage.text})`,
    `Most Used IDE: ${topEditor.name} (${topEditor.text})`,
    `Most Used OS: ${topOperatingSystem.name} (${topOperatingSystem.text})`,
    `Gathering ${human_readable_range}`,
  ];

  const gist = await octoClient.gists.get({ gist_id: GIST_ID });

  try {
    const filename = Object.keys(gist.data.files)[0];
    await octoClient.gists.update({
      gist_id: GIST_ID,
      files: {
        [filename]: {
          filename: `🚀 My WakaTime Profile`,
          content: LINES.join("\n"),
        },
      },
    });
  } catch (error) {
    console.error(`Unable to update gist\n${error}`);
  }
}

job();
