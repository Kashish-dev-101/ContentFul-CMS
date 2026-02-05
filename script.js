"use strict";

const postImgElm = document.querySelector("#postCover");
const postTileElm = document.querySelector("#postTitle");
const avatarImgElm = document.querySelector("#authorAvatar");
const authotNameElm = document.querySelector("#authorName");
const createdAtElm = document.querySelector("#createdAt");
const postCard = document.querySelector("#postCard");
const postLink = document.querySelector("#postLink");
const titleLink = document.querySelector("#postTitle");

const { SPACE_ID, ENV_ID, DELIVERY_TOKEN } = CONFIG.CONTENTFUL;

const CONTENTFUL_BASE = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENV_ID}`;

function pickImageKitUrls(entryFields) {
  const mediaArr = entryFields?.featuredMedia;
  if (!Array.isArray(mediaArr) || mediaArr.length === 0)
    return { coverUrl: "", avatarUrl: "" };

  const first = mediaArr[0] || {};
  const coverUrl = first.url || first.previewUrl || "";
  const avatarUrl = first.thumbnail || first.url || first.previewUrl || "";

  return { coverUrl, avatarUrl };
}

async function fetchLatestBlogPost() {
  const url =
    `${CONTENTFUL_BASE}/entries` +
    `?content_type=blogPost` +
    `&limit=1` +
    `&order=-sys.createdAt` +
    `&select=sys.id,sys.createdAt,fields.title,fields.slug,fields.featuredMedia`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${DELIVERY_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Contentful request failed: ${res.status} ${text}`);
  }

  return res.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetchLatestBlogPost();

    const entry = response?.items?.[0];
    if (!entry) {
      console.error(
        "No blogPost entries found. Make sure at least one entry is published."
      );
      return;
    }

    const title = entry?.fields?.title || "Untitled";
    const slug = entry?.fields?.slug || entry?.sys?.id || "";
    const createdAt = entry?.sys?.createdAt
      ? new Date(entry.sys.createdAt)
      : null;

    const { coverUrl, avatarUrl } = pickImageKitUrls(entry.fields);

    postTileElm.textContent = title;

    if (coverUrl) {
      postImgElm.src = coverUrl;
      postImgElm.alt = title;
    } else {
      postImgElm.alt = title;
    }

    authotNameElm.textContent = "Contentful Author";

    if (avatarUrl) {
      avatarImgElm.src = avatarUrl;
      avatarImgElm.alt = "Author";
    }

    if (createdAt) {
      createdAtElm.textContent = createdAt.toDateString();
      createdAtElm.setAttribute("datetime", createdAt.toISOString());
    }

    const detailUrl = slug
      ? `./blog1.html?slug=${encodeURIComponent(slug)}`
      : "#";

    if (postLink) postLink.href = detailUrl;
    if (titleLink) titleLink.href = detailUrl;

    if (postCard && slug) {
      postCard.style.cursor = "pointer";
      postCard.addEventListener("click", () => {
        window.location.href = detailUrl;
      });
    }
  } catch (error) {
    console.error("Error fetching Contentful data:", error);
  }
});
