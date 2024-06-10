import Mustache from "mustache";

const PORT = process.env.PORT || 3033;

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
  
    if (url.pathname === "/") {
      if(req.method === 'GET') {
        const template = await Bun.file("./index.html").text()
        const fragment = await Bun.file("./view/home.html").text()
        const page = Mustache.render(template, null, {
          page: fragment,
        });
      
        return new Response(page, {headers:{'Content-Type': 'html'}});
      }

      if(req.method === 'POST') {
        const fragment = await Bun.file("./view/home.html").text()
        return new Response(fragment, {headers:{'Content-Type': 'html'}});
      }
    }

    if (url.pathname === "/shooting") {
      if(req.method === 'GET') {
        const template = await Bun.file("./index.html").text()
        const fragment = await Bun.file("./view/shooting.html").text()
        const page = Mustache.render(template, null, {
          page: fragment,
        });
      
        return new Response(page, {headers:{'Content-Type': 'html'}});
      }

      if(req.method === 'POST') {
        const fragment = await Bun.file("./view/shooting.html").text()
        return new Response(fragment, {headers:{'Content-Type': 'html'}});
      }
    }

    if (url.pathname === "/shotguns") {
      if(req.method === 'GET') {
        const template = await Bun.file("./index.html").text()
        const fragment = await Bun.file("./view/shotguns.html").text()
        const page = Mustache.render(template, null, {
          page: fragment,
        });
      
        return new Response(page, {headers:{'Content-Type': 'html'}});
      }

      if(req.method === 'POST') {
        const fragment = await Bun.file("./view/shotguns.html").text()
        return new Response(fragment, {headers:{'Content-Type': 'html'}});
      }
    }

    if (url.pathname === "/hand-to-hand") {
      if(req.method === 'GET') {
        const template = await Bun.file("./index.html").text()
        const fragment = await Bun.file("./view/hand-to-hand.html").text()
        const page = Mustache.render(template, null, {
          page: fragment,
        });
      
        return new Response(page, {headers:{'Content-Type': 'html'}});
      }

      if(req.method === 'POST') {
        const fragment = await Bun.file("./view/hand-to-hand.html").text()
        return new Response(fragment, {headers:{'Content-Type': 'html'}});
      }
    }

    if (url.pathname === "/css/style.css") {
      return new Response(Bun.file("./public/css/style.css"),{headers: {'Content-Type': 'text/css'}})
    }

    const fragment = await Bun.file("./view/four-oh-four.html").text()
    return new Response(fragment, {headers:{'Content-Type': 'html'}});
  },
});
  
console.log(`Listening on ${server.url}`);