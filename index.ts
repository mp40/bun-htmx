import Mustache from "mustache";
import { initDatabase } from "./database/init";
import { createCharacter, getAllEquipment, getCharactersByUser } from "./database";
import { getRandomName } from "./utils";

const PORT = process.env.PORT || 3033;

initDatabase()

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/css/style.css") {
      return new Response(Bun.file("./public/css/style.css"),{headers: {'Content-Type': 'text/css'}})
    }
  
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

    if (url.pathname === "/equipment") {
      if(req.method === 'GET') {
        const eqipment = getAllEquipment()
        if(!eqipment) {
          const fragment = await Bun.file("./view/five-hundred.html").text()
          return new Response(fragment, {headers:{'Content-Type': 'html'}});
        }

        const template = await Bun.file("./index.html").text()
        const fragment = await Bun.file("./view/equipment.html").text()
  
        const page = Mustache.render(template, {list: eqipment}, {
          page: fragment,
        });

        return new Response(page, {headers:{'Content-Type': 'html'}});
      }

      if(req.method === 'POST') {
        const eqipment = getAllEquipment()
        const fragment = await Bun.file("./view/equipment.html").text()
        const enriched = Mustache.render(fragment, {list: eqipment});

        return new Response(enriched, {headers:{'Content-Type': 'html'}});
      }
    }

    if (url.pathname === "/character") {
      if(req.method === 'GET') {
        const template = await Bun.file("./index.html").text()
        const fragment = await Bun.file("./view/character.html").text()
        const list = await Bun.file("./view/character-list.html").text()

        const characters = getCharactersByUser(1)

        const page = Mustache.render(template, {list: characters}, {
          page: fragment,
          characterList: list,
        });
      
        return new Response(page, {headers:{'Content-Type': 'html'}});
      }
      if(req.method === 'POST') {
        const fragment = await Bun.file("./view/character.html").text()
        const list = await Bun.file("./view/character-list.html").text()

        const characters = getCharactersByUser(1)

        const f = Mustache.render(fragment, {list:characters}, {
          characterList: list,
        });
        return new Response(f, {headers:{'Content-Type': 'html'}});
      }
    }

    if (url.pathname === "/character/list") {
      if(req.method === 'POST') {
        const d = new Date()
        const payload = {
          userId: 1,
          name: `${getRandomName()}_${d.getMilliseconds()}`,
          str: 10,
          int: 10,
          wil: 10,
          hlt: 10,
          agi:10,
        }
        createCharacter(payload)

        const characters = getCharactersByUser(1)

        const fragment = await Bun.file("./view/character-list.html").text()
        const f = Mustache.render(fragment, {list: characters});
        return new Response(f, {headers:{'Content-Type': 'html'}});
      }
    }

    const fragment = await Bun.file("./view/four-oh-four.html").text()
    return new Response(fragment, {headers:{'Content-Type': 'html'}});
  },
});
  
console.log(`Listening on ${server.url}`);