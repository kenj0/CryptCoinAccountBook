var g_btc_jpy_price_log = null

function loadBtcJpyPriceData(path) {
  g_btc_jpy_price_log = new Array();
  $.get(path, function(csv_str) {
    // console.log(csv_str);
    var lines = csv_str.split(/\r\n|\r|\n/);
    for (var i = 1; i < lines.length; ++i) {  // skip first caption line
      var cells = lines[i].split(",");
      if (cells.length == 6) {
        var price_data = {
          "date" : cells[0],
          "open" : parseInt(cells[1]),
          "high" : parseInt(cells[2]),
          "low" : parseInt(cells[3]),
          "close" : parseInt(cells[4]),
          "volume" : parseInt(cells[5]),
          "mid" : 0
        };
        price_data["mid"] = Math.floor((price_data["open"] + price_data["close"]) / 2)  // tentative
        g_btc_jpy_price_log.push(price_data);
      }
    }
    // console.log(g_btc_jpy_price_log)
  });
}

window.onload = function() {
  // original: https://jpbitcoin.com/download/jpbitcoinbpi201711.csv
  // TODO: support realtime price data applying
  loadBtcJpyPriceData("data/jpbitcoinbpi.csv");
};

function getBtcJpyPrice(date) {
  var filtered_data = g_btc_jpy_price_log.filter(function(item, index) {
    if (item.date == date) { return true; }
  });
  if (filtered_data.length == 0) {
    return 0;  // not found
  }
  return filtered_data[0].mid
};
