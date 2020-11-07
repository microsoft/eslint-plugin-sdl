# Do not use * as target origin when sending data to other windows (no-postmessage-star-origin)

Always provide specific target origin, not * when sending data to other windows using [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Security_concerns) to avoid data leakage outside of trust boundary.
