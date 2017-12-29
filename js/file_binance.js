var g_binance_bnb_trade_list = ["NULSBNB", "VENBNB", "ADXBNB", "AIONBNB", "AMBBNB", "BATBNB", "BCCBNB", "BCPTBNB", "BRDBNB", "BTSBNB", "CMTBNB", "CNDBNB", "DLTBNB", "GTOBNB", "ICXBNB", "IOTABNB", "LSKBNB", "MCOBNB", "NAVBNB", "NEBLBNB", "NEOBNB", "OSTBNB", "POWRBNB", "QSPBNB", "RCNBNB", "RDNBNB", "WABIBNB", "WAVESBNB", "WTCBNB", "XLMBNB", "XZCBNB", "YOYOBNB"]
var g_binance_btc_trade_list = ["BNBBTC", "NULSBTC", "CTRBTC", "NEOBTC", "LINKBTC", "SALTBTC", "IOTABTC", "ETCBTC", "KNCBTC", "WTCBTC", "SNGLSBTC", "GASBTC", "SNMBTC", "BQXBTC", "QTUMBTC", "LTCBTC", "ETHBTC", "STRATBTC", "ZRXBTC", "BCCBTC", "OMGBTC", "MCOBTC", "ADABTC", "ADXBTC", "AIONBTC", "AMBBTC", "ARKBTC", "ARNBTC", "ASTBTC", "BATBTC", "BCDBTC", "BCPTBTC", "BNTBTC", "BRDBTC", "BTGBTC", "BTSBTC", "CDTBTC", "CMTBTC", "CNDBTC", "DASHBTC", "DGDBTC", "DLTBTC", "DNTBTC", "EDOBTC", "ELFBTC", "ENGBTC", "ENJBTC", "EOSBTC", "EVXBTC", "FUELBTC", "FUNBTC", "GTOBTC", "GVTBTC", "GXSBTC", "HSRBTC", "ICNBTC", "ICXBTC", "KMDBTC", "LENDBTC", "LRCBTC", "LSKBTC", "LUNBTC", "MANABTC", "MDABTC", "MODBTC", "MTHBTC", "MTLBTC", "NAVBTC", "NEBLBTC", "OAXBTC", "OSTBTC", "POEBTC", "POWRBTC", "PPTBTC", "QSPBTC", "RCNBTC", "RDNBTC", "REQBTC", "SNTBTC", "STORJBTC", "SUBBTC", "TNBBTC", "TNTBTC", "TRXBTC", "VENBTC", "VIBBTC", "WABIBTC", "WAVESBTC", "WINGSBTC", "XLMBTC", "XMRBTC", "XRPBTC", "XVGBTC", "XZCBTC", "YOYOBTC", "ZECBTC"]
var g_binance_eth_trade_list = ["NULSETH", "ASTETH", "EOSETH", "SNTETH", "MCOETH", "OAXETH", "OMGETH", "BQXETH", "WTCETH", "QTUMETH", "BNTETH", "DNTETH", "ICNETH", "SNMETH", "SNGLSETH", "NEOETH", "KNCETH", "STRATETH", "ZRXETH", "FUNETH", "LINKETH", "XVGETH", "IOTAETH", "CTRETH", "SALTETH", "ADAETH", "ADXETH", "AIONETH", "AMBETH", "ARKETH", "ARNETH", "BATETH", "BCCETH", "BCDETH", "BCPTETH", "BNBETH", "BRDETH", "BTGETH", "BTSETH", "CDTETH", "CMTETH", "CNDETH", "DASHETH", "DGDETH", "DLTETH", "EDOETH", "ELFETH", "ENGETH", "ENJETH", "ETCETH", "EVXETH", "FUELETH", "GTOETH", "GVTETH", "GXSETH", "HSRETH", "ICXETH", "KMDETH", "LENDETH", "LRCETH", "LSKETH", "LTCETH", "LUNETH", "MANAETH", "MDAETH", "MODETH", "MTHETH", "MTLETH", "NAVETH", "NEBLETH", "OSTETH", "POEETH", "POWRETH", "PPTETH", "QSPETH", "RCNETH", "RDNETH", "REQETH", "STORJETH", "SUBETH", "TNBETH", "TNTETH", "TRXETH", "VENETH", "VIBETH", "WABIETH", "WAVESETH", "WINGSETH", "XLMETH", "XMRETH", "XRPETH", "XZCETH", "YOYOETH", "ZECETH"]
var g_binance_usdt_trade_list = ["BTCUSDT", "BCCUSDT", "LTCUSDT", "NEOUSDT", "BNBUSDT", "ETHUSDT"]


function convertMarketCsv(csv_str) {
  var buff = "[";
  var lines = csv_str.split(/\r\n|\r|\n/);
  if (0 < lines.length) {
    labels = lines[0].split(',');
    for (var i=1; i<lines.length; ++i) {
      data = lines[i].split(',');
      if (data.length == labels.length) {
        if (1 < i) { buff += "," }
        buff += "{";
        for (var j=0; j<data.length; ++j) {
          if (0 < j) { buff += "," }
          buff += "\"" + labels[j] + "\"" + ":";
          if ((data[j] != "" && isFinite(data[j])) || data[j] == "true" || data[j] == "false") {
            buff += data[j];
          } else {
            buff += "\"" + data[j] + "\"";
          }
        }
        buff += "}";
      }
    }
  }
  buff += "]";
  return buff;
}

function loadBinanceHistory(csv_str) {
  binance_history = JSON.parse(convertMarketCsv(csv_str));
  // console.log(binance_history);
  var l_history = [];
  for (var i=0; i<binance_history.length; ++i) {
    var transaction = {
      "datetime" : binance_history[i].Date.replace(/-/g, "/"),
      "buyCoin" :"",
      "buyAmount" : 0,
      "sellCoin" : "",
      "sellAmount" : 0,
      "isAltTrade" : true,  // allways true for binance market tradeing
      "altJPY" : 0,         // TODO: load JPY value
      "marketplace" : "Binance",
      "comment" : ""
    };
    var market = "";
    if (g_binance_bnb_trade_list.indexOf(binance_history[i].Market) != -1) {
      market = "BNB";
    } else if (g_binance_btc_trade_list.indexOf(binance_history[i].Market) != -1) {
      market = "BTC";
    } else if (g_binance_eth_trade_list.indexOf(binance_history[i].Market) != -1) {
      market = "ETH";
    } else if (g_binance_usdt_trade_list.indexOf(binance_history[i].Market) != -1) {
      market = "USDT";
    } else {
      aleart("Error: Could not parse Market column.");
    }
    var resource_coin = market;
    var target_coin = binance_history[i].Market.substring(0, binance_history[i].Market.indexOf(market));
    if (binance_history[i].Type == "BUY") {
      transaction["buyCoin"] = target_coin;
      transaction["sellCoin"] = resource_coin;
      transaction["buyAmount"] = binance_history[i].Amount;
      transaction["sellAmount"] = binance_history[i].Total;
    } else if (binance_history[i].Type == "SELL") {
      transaction["buyCoin"] = resource_coin;
      transaction["sellCoin"] = target_coin;
      transaction["buyAmount"] = binance_history[i].Total;
      transaction["sellAmount"] = binance_history[i].Amount;
    } else {
      aleart("Error: Could not parse Type column.");
    }
    // console.log(transaction);
    l_history.push(transaction);
  }
  return l_history;
}
