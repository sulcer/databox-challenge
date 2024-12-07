interface Bar {
  c: number; // Close price
  h: number; // High price
  l: number; // Low price
  n: number; // Number of trades
  o: number; // Open price
  t: string; // Timestamp
  v: number; // Volume
  vw: number; // Volume-weighted average price
}

export interface AlpacaResponse {
  bars: {
    [symbol: string]: Bar;
  };
}

interface AVMetaData {
  information: string; // Description of the data
  symbol: string; // Stock symbol
  lastRefreshed: string; // Last update timestamp
  interval: string; // Interval (e.g., "5min")
  outputSize: string; // Data output size (e.g., "Compact")
  timeZone: string; // Timezone of the data
}

interface TimeSeriesEntry {
  open: string; // Open price
  high: string; // High price
  low: string; // Low price
  close: string; // Close price
  volume: string; // Volume of trade
}

export interface AlphaVantageResponse {
  metaData: AVMetaData;
  timeSeries: Record<string, TimeSeriesEntry>;
}
