export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "getkove.co.nz" || url.hostname === "www.getkove.co.nz") {
      return Response.redirect("https://kove.nz" + url.pathname + url.search, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
