// Put all file typings to bypass (for file-loader) here.
declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module '*.jpeg' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  const value: any;
  export = value;
}

// To support importing CSS module in the codebase.
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
