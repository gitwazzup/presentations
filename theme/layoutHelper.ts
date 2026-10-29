// Turn a frontmatter image value into a CSS background, respecting the deploy base path.
export function resolveAssetUrl(url: string) {
  if (url.startsWith('/'))
    return import.meta.env.BASE_URL + url.slice(1)
  return url
}

export function backgroundStyle(image?: string, dim = false) {
  if (!image)
    return {}
  const url = `url("${resolveAssetUrl(image)}")`
  return {
    backgroundImage: dim ? `linear-gradient(#0003, #000a), ${url}` : url,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}
