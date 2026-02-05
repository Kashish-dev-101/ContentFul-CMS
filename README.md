# Contentful Blog with ImageKit

A minimal blog application demonstrating how to use **Contentful CMS** with **ImageKit** for optimized image delivery.

**[Live Demo](https://kashish-dev-101.github.io/ContentFul-CMS/index.html)**

## Overview

This project shows how to build a content-driven web app where:
- **Contentful** manages your blog content (posts, metadata)
- **ImageKit** handles image optimization and delivery

The ImageKit plugin for Contentful lets you access your media library directly within the CMS, automatically delivering images in the optimal format and size.

## Features

- Fetches blog posts from Contentful Delivery API
- Displays ImageKit-optimized images (cover images, thumbnails)
- Responsive card-based layout
- Clean, modern UI with hover animations

## Project Structure

```
├── index.html          # Main HTML page
├── style.css           # Styling
├── script.js           # Contentful API integration
├── config.js           # API credentials
└── config.example.js   # Template for credentials
```

## Setup

### Prerequisites

- A [Contentful](https://www.contentful.com/) account
- An [ImageKit](https://imagekit.io/) account
- ImageKit app installed in your Contentful space

### 1. Install ImageKit Plugin in Contentful

1. Go to your Contentful space → **Apps** → **Marketplace**
2. Search for "ImageKit" and click **Install**
3. Follow the setup wizard to connect your ImageKit account

### 2. Create Content Model

Create a `blogPost` content type with these fields:

| Field | Type | Description |
|-------|------|-------------|
| `title` | Short text | Post title |
| `slug` | Short text | URL-friendly identifier |
| `featuredMedia` | JSON object | ImageKit media field |

For the `featuredMedia` field, set the appearance to use the ImageKit app.

### 3. Configure the Project

1. Copy the example config:
   ```bash
   cp config.example.js config.js
   ```

2. Add your Contentful credentials to `config.js`:
   ```javascript
   const CONFIG = {
     CONTENTFUL: {
       SPACE_ID: "your_space_id",
       ENV_ID: "master",
       DELIVERY_TOKEN: "your_delivery_token",
     },
   };
   ```

You can find these in Contentful under **Settings** → **API keys**.

### 4. Run the Project

Open `index.html` in your browser, or use a local server:

```bash
npx serve .
```

## How It Works

### ImageKit Integration

When you select an image through the ImageKit app in Contentful, it stores a JSON object with optimized URLs:

```javascript
{
  "url": "https://ik.imagekit.io/your_id/image.jpg",
  "thumbnail": "https://ik.imagekit.io/your_id/tr:w-300/image.jpg",
  "width": 1920,
  "height": 1080,
  // ... other metadata
}
```

The `script.js` extracts these URLs to display images:

```javascript
function pickImageKitUrls(entryFields) {
  const mediaArr = entryFields?.featuredMedia;
  const first = mediaArr[0] || {};

  return {
    coverUrl: first.url || first.previewUrl || "",
    avatarUrl: first.thumbnail || first.url || ""
  };
}
```

### Contentful API

The app uses the Contentful Delivery API. Here are the available endpoints:

**Get all entries:**
```
https://cdn.contentful.com/spaces/{{SPACE_ID}}/environments/{{ENV_ID}}/entries
```

**Get entries by content type:**
```
https://cdn.contentful.com/spaces/{{SPACE_ID}}/environments/{{ENV_ID}}/entries?content_type=blogPost
```

**Get specific entry by slug with field selection:**
```
https://cdn.contentful.com/spaces/{{SPACE_ID}}/environments/{{ENV_ID}}/entries?content_type=blogPost&fields.slug=my-first-blog&select=sys.id,fields.featuredMedia
```

The app fetches the latest blog post:

```javascript
const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENV_ID}/entries`
  + `?content_type=blogPost`
  + `&limit=1`
  + `&order=-sys.createdAt`;
```

All requests require the `Authorization: Bearer {{DELIVERY_TOKEN}}` header.

## Why ImageKit + Contentful?

| Benefit | Description |
|---------|-------------|
| **Automatic optimization** | Images delivered in optimal format (WebP, AVIF) and size |
| **Fast delivery** | Global CDN ensures quick load times |
| **Easy transformations** | Resize, crop, and transform images via URL parameters |
| **Unified workflow** | Manage media without leaving Contentful |

## Resources

- [ImageKit Contentful Integration Docs](https://imagekit.io/docs/integration/contentful)
- [Contentful Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/)
- [ImageKit Transformations](https://imagekit.io/docs/transformations)

## License

MIT
