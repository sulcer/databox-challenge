export interface Bar {
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
    [symbol: string]: Bar[];
  };
}
