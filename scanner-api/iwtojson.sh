#!/bin/sh
devname="$1"
echo -e "$(iw $devname scan | sed -e 's#(on wlan# (on wlan#g' | awk '
BEGIN {
  printf("[\n")
}
NF > 0 {
  if ($1 == "BSS") {
    if ($2 ~ /^[a-z0-9:]{17}$/) {
      if (e["MAC"]) {
        printf("{\"mac\":\"%s\",\"ssid\":\"%s\",\"freq\":%s,\"signal\":%s,\"quality\":%s,\"wpa\":\"%s\",\"wpa2\":\"%s\",\"wep\":\"%s\",\"channel\":%s,\"tkip\":\"%s\",\"ccmp\":\"%s\"},\n",
          e["MAC"], e["SSID"], e["freq"], e["signal"], e["quality"], e["WPA"], e["WPA2"], e["WEP"], e["Channel"], e["TKIP"], e["CCMP"]);
      }
      e["MAC"] = $2;
      e["WPA"] = "n";
      e["WPA2"] = "n";
      e["WEP"] = "n";
      e["TKIP"] = "n";
      e["CCMP"] = "n";
    }
  }
  if ($1 == "SSID:") {
    e["SSID"] = $2;
  }
  if ($1 == "freq:") {
    e["freq"] = $NF;
  }
  if ($1 == "signal:") {
    e["signal"] = $2;
    e["quality"] = 2 * ($2 + 100);
  }
  if ($1 == "WPA:") {
    e["WPA"] = "y";
  }
  if ($1 == "RSN:") {
    e["WPA2"] = "y";
  }
  if ($1 == "WEP:") {
    e["WEP"] = "y";
  }
  if ($3 == "set:"){
    e["Channel"] = $5;
  }
  if ($4 == "CCMP" || $5 == "CCMP") {
    e["CCMP"] = "y";
  }
  if ($4 == "TKIP" || $5 == "TKIP") {
    e["TKIP"] = "y";
  }
}
END {
  printf("{\"mac\":\"%s\",\"ssid\":\"%s\",\"freq\":%s,\"signal\":%s,\"quality\":%s,\"wpa\":\"%s\",\"wpa2\":\"%s\",\"wep\":\"%s\",\"channel\":%s,\"tkip\":\"%s\",\"ccmp\":\"%s\"}\n",
    e["MAC"], e["SSID"], e["freq"], e["signal"], e["quality"], e["WPA"], e["WPA2"], e["WEP"], e["Channel"], e["TKIP"], e["CCMP"]);
  printf("]\n")
}')"
