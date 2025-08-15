const marquee = document.getElementById("marquee");

async function fetchCoins() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false"
    );
    const coins = await res.json();
    marquee.innerHTML = "";

    coins.forEach((coin) => {
      const coinEl = document.createElement("div");
      coinEl.className =
        "inline-flex items-center gap-3 px-6 text-white font-medium bg-gray-800/30 rounded-lg mx-2 py-1 hover:scale-105 transition-transform duration-300";
      coinEl.innerHTML = `
            <img src="${coin.image}" alt="${
        coin.name
      }" class="w-6 h-6 rounded-full" />
            <span>${coin.name}</span>
            <span class="font-bold">$${coin.current_price.toLocaleString()}</span>
          `;
      marquee.appendChild(coinEl);
    });
  } catch (err) {
    console.error(err);
    marquee.innerHTML =
      '<span class="text-red-500 px-6">Failed to load data</span>';
  }
}

fetchCoins();
setInterval(fetchCoins, 60000); // refresh every 60 seconds
