# Contentful Blog with ImageKit

A minimal blog application demonstrating how to use **Contentful CMS** with **ImageKit** for optimized image delivery.

**[Live Demo](https://kashish-dev-101.github.io/ContentFul-CMS/index.html)**

## Overview

This project shows how to build a content-driven web app where:

- **Contentful** manages your blog content (posts, metadata)
- **ImageKit** handles image optimization and delivery

The ImageKit plugin for Contentful lets you access your ImageKit media library directly within the ContentFul CMS, allow users to deliver images in the optimal format and size.

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
- [ImageKit app](https://imagekit.io/docs/integration/contentful) installed in your Contentful space

### 1. Install ImageKit Plugin in Contentful

1. Go to your Contentful space → **Apps** → **Marketplace**
2. Search for "ImageKit" and click **Install**
3. Follow the setup wizard to connect your ImageKit account

### 2. Create Content Model

Create a `blogPost` content type with these fields:

| Field           | Type        | Description             |
| --------------- | ----------- | ----------------------- |
| `title`         | Short text  | Post title              |
| `slug`          | Short text  | URL-friendly identifier |
| `featuredMedia` | JSON object | ImageKit media field    |

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
    avatarUrl: first.thumbnail || first.url || "",
  };
}
```

### Contentful API

The app uses the Contentful Delivery API. All requests require the `Authorization: Bearer {{DELIVERY_TOKEN}}` header.

Below are the available endpoints with curl commands and their full response output.

---

#### 1. Get all entries

```bash
curl -s "https://cdn.contentful.com/spaces/{{SPACE_ID}}/environments/{{ENV_ID}}/entries" \
  -H "Authorization: Bearer {{DELIVERY_TOKEN}}"
```

<details>
<summary>Full response</summary>

```json
{
  "sys": {
    "type": "Array"
  },
  "total": 2,
  "skip": 0,
  "limit": 100,
  "items": [
    {
      "metadata": {
        "tags": [],
        "concepts": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "s94p987xag5p"
          }
        },
        "id": "29KaX3kj6q3SmX0olnewSl",
        "type": "Entry",
        "createdAt": "2026-01-02T07:17:48.171Z",
        "updatedAt": "2026-02-04T15:43:26.538Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "publishedVersion": 20,
        "revision": 7,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "blogPost"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "title": "My first blog with Contentful",
        "slug": "my-first-blog",
        "body": {
          "data": {},
          "content": [
            {
              "data": {},
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                  "nodeType": "text"
                }
              ],
              "nodeType": "paragraph"
            }
          ],
          "nodeType": "document"
        },
        "featuredMedia": [
          {
            "type": "file",
            "name": "test,køkken_Md9nFH4Ra.jpg",
            "createdAt": "2026-01-29T06:36:40.853Z",
            "createdBy": {
              "name": "kumar",
              "userId": "62de43ec6f68334a5a33e314",
              "email": "ashishleo10@gmail.com"
            },
            "updatedAt": "2026-01-29T06:36:47.069Z",
            "fileId": "697afff85c7cd75eb883ba89",
            "tags": null,
            "AITags": null,
            "versionInfo": {
              "id": "697afff85c7cd75eb883ba89",
              "name": "Version 1"
            },
            "embeddedMetadata": {
              "YResolution": 72,
              "XResolution": 72,
              "DateCreated": "2026-01-29T06:36:43.249Z",
              "DateTimeCreated": "2026-01-29T06:36:43.249Z"
            },
            "isPublished": true,
            "customCoordinates": null,
            "customMetadata": {
              "Status": "Pending",
              "User Generate Content": "Customer Reviews ",
              "policyTest": "PolicyTest"
            },
            "isPrivateFile": false,
            "url": "https://ik.imagekit.io/Kashish12345/test,k%C3%B8kken_Md9nFH4Ra.jpg?updatedAt=1769668607069&tr=w-500:q-70",
            "thumbnail": "https://ik.imagekit.io/Kashish12345/test,k%C3%B8kken_Md9nFH4Ra.jpg?updatedAt=1769668607069&tr=n-ik_ml_thumbnail",
            "previewUrl": "https://ik.imagekit.io/Kashish12345/test,k%C3%B8kken_Md9nFH4Ra.jpg?updatedAt=1769668607069",
            "fileType": "image",
            "filePath": "/test,køkken_Md9nFH4Ra.jpg",
            "height": 4500,
            "width": 3000,
            "size": 2010371,
            "hasAlpha": false,
            "mime": "image/jpeg",
            "selectedFieldsSchema": { "..." : "custom metadata field definitions" },
            "imagekitId": "Kashish12345"
          }
        ]
      }
    },
    {
      "metadata": {
        "tags": [],
        "concepts": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "s94p987xag5p"
          }
        },
        "id": "WgiCJK8attBIdeGtoAzid",
        "type": "Entry",
        "createdAt": "2025-10-22T15:34:15.441Z",
        "updatedAt": "2025-10-22T15:34:15.441Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "publishedVersion": 2,
        "revision": 1,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "sampleContentTypeImageKit"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "heroImageImageKit": [
          {
            "type": "file",
            "name": "Capt Pres 2025 (5)_cnIQnsZhR5.jpg",
            "createdAt": "2025-09-25T03:35:38.733Z",
            "createdBy": {
              "userId": "62de43ec6f68334a5a33e314",
              "name": "kumar",
              "email": "ashishleo10@gmail.com"
            },
            "updatedAt": "2025-10-15T09:43:00.916Z",
            "fileId": "68d4b88a5c7cd75eb8be1e14",
            "tags": ["tag1", "tag2"],
            "AITags": [
              { "name": "Field", "confidence": 99.73, "source": "aws-auto-tagging" },
              { "name": "Outdoors", "confidence": 96.48, "source": "aws-auto-tagging" },
              { "name": "Nature", "confidence": 95.6, "source": "aws-auto-tagging" },
              { "name": "Recreation", "confidence": 94, "source": "google-auto-tagging" },
              { "name": "Individual sport", "confidence": 93.33, "source": "google-auto-tagging" }
            ],
            "versionInfo": {
              "id": "68d4b88a5c7cd75eb8be1e14",
              "name": "Version 1"
            },
            "embeddedMetadata": {
              "FNumber": 7.1,
              "ISO": 100,
              "ApertureValue": 5.625,
              "MeteringMode": "Pattern",
              "Flash": "Flash did not fire",
              "WhiteBalance": "Auto",
              "ExifVersion": "0231",
              "XResolution": 1366,
              "YResolution": 1366,
              "ResolutionUnit": "inches",
              "ColorSpace": "sRGB",
              "DateCreated": "2025-09-25T03:35:39.316Z",
              "DateTimeCreated": "2025-09-25T03:35:39.317Z"
            },
            "isPublished": true,
            "customCoordinates": "10,10,100,100",
            "customMetadata": {
              "Status": "Pending",
              "User Generate Content": "Customer Reviews ",
              "policyTest": "PolicyTest"
            },
            "isPrivateFile": false,
            "url": "https://ik.imagekit.io/Kashish12345/Capt%20Pres%202025%20(5)_cnIQnsZhR5.jpg?updatedAt=1760521380916&tr=q-80",
            "thumbnail": "https://ik.imagekit.io/Kashish12345/Capt%20Pres%202025%20(5)_cnIQnsZhR5.jpg?updatedAt=1760521380916&tr=n-ik_ml_thumbnail",
            "fileType": "image",
            "filePath": "/Capt Pres 2025 (5)_cnIQnsZhR5.jpg",
            "height": 5464,
            "width": 8192,
            "size": 2543988,
            "hasAlpha": false,
            "mime": "image/jpeg",
            "description": "A group of bowlers, dressed in green and white, gathers around a coach demonstrating techniques on a bowling green.",
            "selectedFieldsSchema": { "..." : "custom metadata field definitions" },
            "imagekitId": "Kashish12345"
          }
        ]
      }
    }
  ]
}
```

</details>

---

#### 2. Get entries by content type

```bash
curl -s "https://cdn.contentful.com/spaces/{{SPACE_ID}}/environments/{{ENV_ID}}/entries?content_type=blogPost" \
  -H "Authorization: Bearer {{DELIVERY_TOKEN}}"
```

<details>
<summary>Full response</summary>

```json
{
  "sys": {
    "type": "Array"
  },
  "total": 1,
  "skip": 0,
  "limit": 100,
  "items": [
    {
      "metadata": {
        "tags": [],
        "concepts": []
      },
      "sys": {
        "space": {
          "sys": {
            "type": "Link",
            "linkType": "Space",
            "id": "s94p987xag5p"
          }
        },
        "id": "29KaX3kj6q3SmX0olnewSl",
        "type": "Entry",
        "createdAt": "2026-01-02T07:17:48.171Z",
        "updatedAt": "2026-02-04T15:43:26.538Z",
        "environment": {
          "sys": {
            "id": "master",
            "type": "Link",
            "linkType": "Environment"
          }
        },
        "publishedVersion": 20,
        "revision": 7,
        "contentType": {
          "sys": {
            "type": "Link",
            "linkType": "ContentType",
            "id": "blogPost"
          }
        },
        "locale": "en-US"
      },
      "fields": {
        "title": "My first blog with Contentful",
        "slug": "my-first-blog",
        "body": {
          "data": {},
          "content": [
            {
              "data": {},
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                  "nodeType": "text"
                }
              ],
              "nodeType": "paragraph"
            },
            {
              "data": {},
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
                  "nodeType": "text"
                }
              ],
              "nodeType": "paragraph"
            }
          ],
          "nodeType": "document"
        },
        "featuredMedia": [
          {
            "type": "file",
            "name": "test,køkken_Md9nFH4Ra.jpg",
            "createdAt": "2026-01-29T06:36:40.853Z",
            "createdBy": {
              "name": "kumar",
              "userId": "62de43ec6f68334a5a33e314",
              "email": "ashishleo10@gmail.com"
            },
            "updatedAt": "2026-01-29T06:36:47.069Z",
            "fileId": "697afff85c7cd75eb883ba89",
            "tags": null,
            "AITags": null,
            "versionInfo": {
              "id": "697afff85c7cd75eb883ba89",
              "name": "Version 1"
            },
            "embeddedMetadata": {
              "YResolution": 72,
              "XResolution": 72,
              "DateCreated": "2026-01-29T06:36:43.249Z",
              "DateTimeCreated": "2026-01-29T06:36:43.249Z"
            },
            "isPublished": true,
            "customCoordinates": null,
            "customMetadata": {
              "Status": "Pending",
              "User Generate Content": "Customer Reviews ",
              "policyTest": "PolicyTest"
            },
            "isPrivateFile": false,
            "url": "https://ik.imagekit.io/Kashish12345/test,k%C3%B8kken_Md9nFH4Ra.jpg?updatedAt=1769668607069&tr=w-500:q-70",
            "thumbnail": "https://ik.imagekit.io/Kashish12345/test,k%C3%B8kken_Md9nFH4Ra.jpg?updatedAt=1769668607069&tr=n-ik_ml_thumbnail",
            "previewUrl": "https://ik.imagekit.io/Kashish12345/test,k%C3%B8kken_Md9nFH4Ra.jpg?updatedAt=1769668607069",
            "fileType": "image",
            "filePath": "/test,køkken_Md9nFH4Ra.jpg",
            "height": 4500,
            "width": 3000,
            "size": 2010371,
            "hasAlpha": false,
            "mime": "image/jpeg",
            "selectedFieldsSchema": { "..." : "custom metadata field definitions" },
            "imagekitId": "Kashish12345"
          }
        ]
      }
    }
  ]
}
```

</details>

---

#### 3. Get specific entry by slug with field selection

```bash
curl -s "https://cdn.contentful.com/spaces/{{SPACE_ID}}/environments/{{ENV_ID}}/entries?content_type=blogPost&fields.slug=my-first-blog&select=sys.id,fields.featuredMedia" \
  -H "Authorization: Bearer {{DELIVERY_TOKEN}}"
```

<details>
<summary>Full response</summary>

```json
{
  "sys": {
    "type": "Array"
  },
  "total": 1,
  "skip": 0,
  "limit": 100,
  "items": [
    {
      "fields": {
        "featuredMedia": [
          {
            "type": "file",
            "name": "test,køkken_Md9nFH4Ra.jpg",
            "createdAt": "2026-01-29T06:36:40.853Z",
            "createdBy": {
              "name": "kumar",
              "userId": "62de43ec6f68334a5a33e314",
              "email": "ashishleo10@gmail.com"
            },
            "updatedAt": "2026-01-29T06:36:47.069Z",
            "fileId": "697afff85c7cd75eb883ba89",
            "tags": null,
            "AITags": null,
            "versionInfo": {
              "id": "697afff85c7cd75eb883ba89",
              "name": "Version 1"
            },
            "embeddedMetadata": {
              "YResolution": 72,
              "XResolution": 72,
              "DateCreated": "2026-01-29T06:36:43.249Z",
              "DateTimeCreated": "2026-01-29T06:36:43.249Z"
            },
            "isPublished": true,
            "customCoordinates": null,
            "customMetadata": {
              "Status": "Pending",
              "User Generate Content": "Customer Reviews ",
              "policyTest": "PolicyTest"
            },
            "isPrivateFile": false,
            "url": "https://ik.imagekit.io/Kashish12345/test,k%C3%B8kken_Md9nFH4Ra.jpg?updatedAt=1769668607069&tr=w-500:q-70",
            "thumbnail": "https://ik.imagekit.io/Kashish12345/test,k%C3%B8kken_Md9nFH4Ra.jpg?updatedAt=1769668607069&tr=n-ik_ml_thumbnail",
            "previewUrl": "https://ik.imagekit.io/Kashish12345/test,k%C3%B8kken_Md9nFH4Ra.jpg?updatedAt=1769668607069",
            "fileType": "image",
            "filePath": "/test,køkken_Md9nFH4Ra.jpg",
            "height": 4500,
            "width": 3000,
            "size": 2010371,
            "hasAlpha": false,
            "mime": "image/jpeg",
            "selectedFieldsSchema": { "..." : "custom metadata field definitions" },
            "imagekitId": "Kashish12345"
          }
        ]
      },
      "sys": {
        "id": "29KaX3kj6q3SmX0olnewSl"
      }
    }
  ]
}
```

</details>

---

#### 4. Get latest blog post (used in the app)

This is the actual call made by `script.js`:

```bash
curl -s "https://cdn.contentful.com/spaces/{{SPACE_ID}}/environments/{{ENV_ID}}/entries?content_type=blogPost&limit=1&order=-sys.createdAt&select=sys.id,sys.createdAt,fields.title,fields.slug,fields.featuredMedia" \
  -H "Authorization: Bearer {{DELIVERY_TOKEN}}"
```

<details>
<summary>Full response</summary>

```json
{
  "sys": {
    "type": "Array"
  },
  "total": 1,
  "skip": 0,
  "limit": 1,
  "items": [
    {
      "fields": {
        "title": "My first blog with Contentful",
        "slug": "my-first-blog",
        "featuredMedia": [
          {
            "type": "file",
            "name": "test,køkken_Md9nFH4Ra.jpg",
            "createdAt": "2026-01-29T06:36:40.853Z",
            "createdBy": {
              "name": "kumar",
              "userId": "62de43ec6f68334a5a33e314",
              "email": "ashishleo10@gmail.com"
            },
            "updatedAt": "2026-01-29T06:36:47.069Z",
            "fileId": "697afff85c7cd75eb883ba89",
            "tags": null,
            "AITags": null,
            "versionInfo": {
              "id": "697afff85c7cd75eb883ba89",
              "name": "Version 1"
            },
            "embeddedMetadata": {
              "YResolution": 72,
              "XResolution": 72,
              "DateCreated": "2026-01-29T06:36:43.249Z",
              "DateTimeCreated": "2026-01-29T06:36:43.249Z"
            },
            "isPublished": true,
            "customCoordinates": null,
            "customMetadata": {
              "Status": "Pending",
              "User Generate Content": "Customer Reviews ",
              "policyTest": "PolicyTest"
            },
            "isPrivateFile": false,
            "url": "https://ik.imagekit.io/Kashish12345/test,k%C3%B8kken_Md9nFH4Ra.jpg?updatedAt=1769668607069&tr=w-500:q-70",
            "thumbnail": "https://ik.imagekit.io/Kashish12345/test,k%C3%B8kken_Md9nFH4Ra.jpg?updatedAt=1769668607069&tr=n-ik_ml_thumbnail",
            "previewUrl": "https://ik.imagekit.io/Kashish12345/test,k%C3%B8kken_Md9nFH4Ra.jpg?updatedAt=1769668607069",
            "fileType": "image",
            "filePath": "/test,køkken_Md9nFH4Ra.jpg",
            "height": 4500,
            "width": 3000,
            "size": 2010371,
            "hasAlpha": false,
            "mime": "image/jpeg",
            "selectedFieldsSchema": { "..." : "custom metadata field definitions" },
            "imagekitId": "Kashish12345"
          }
        ]
      },
      "sys": {
        "id": "29KaX3kj6q3SmX0olnewSl",
        "createdAt": "2026-01-02T07:17:48.171Z"
      }
    }
  ]
}
```

</details>

## Why ImageKit + Contentful?

| Benefit                    | Description                                              |
| -------------------------- | -------------------------------------------------------- |
| **Automatic optimization** | Images delivered in optimal format (WebP, AVIF) and size |
| **Fast delivery**          | Global CDN ensures quick load times                      |
| **Easy transformations**   | Resize, crop, and transform images via URL parameters    |
| **Unified workflow**       | Manage media without leaving Contentful                  |

## Resources

### Contentful

- [Contentful Delivery API Reference](https://www.contentful.com/developers/docs/references/content-delivery-api/) — querying entries, filtering, pagination, authentication
- [Contentful Images API Reference](https://www.contentful.com/developers/docs/references/images-api/) — resizing, cropping, format conversion (WebP, AVIF), quality control
- [Authentication and API Keys](https://www.contentful.com/developers/docs/references/authentication/) — creating and managing access tokens
- [Content Model Overview](https://www.contentful.com/developers/docs/concepts/data-model/) — spaces, content types, entries, and assets
- [Contentful App Marketplace](https://www.contentful.com/marketplace/) — installing apps like the ImageKit plugin

### ImageKit

- [ImageKit Contentful Integration Docs](https://imagekit.io/docs/integration/contentful) — setting up the ImageKit plugin in Contentful
- [ImageKit Transformations](https://imagekit.io/docs/transformations) — URL-based image transformations

## License

MIT
