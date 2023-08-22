declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    // You can add more jest-dom matchers here if needed
  }
}
