async function request(url, way, body) {
   try {
      const response = await fetch(url, {
         method: way,
         body,
         headers: {
            "Content-type": "application/JSON; charset=UTF-8",
         },
      });
      const parsedResponse = await response.json();
      return parsedResponse;
   } catch (e) {
      console.error(`Error: ${e.message}`);
   }
}

export async function sub(income) {
   var r = await request("/calc/calc", "POST", JSON.stringify({income,}));
   return r
}