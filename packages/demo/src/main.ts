import urlJoin from "url-join";
import version from "virtual:version";

function displayVersion() {
  const versionDiv = document.querySelector("#version");

  if (!versionDiv) {
    throw new Error('Element with id "version" not found');
  }

  versionDiv.textContent = `Version: ${version}`;
}

async function displayFileVersion() {
  const fileVersionDiv = document.querySelector("#file-version");

  if (!fileVersionDiv) {
    throw new Error('Element with id "file-version" not found');
  }

  const result = await fetch(urlJoin(import.meta.env.BASE_URL, "version"));
  const fileVersion = await result.text();

  fileVersionDiv.textContent = `File Version: ${fileVersion}`;
}

Promise.allSettled([displayVersion(), displayFileVersion()]);
