# SA2 Gardening Tools

A cross-platform Chao save file editor for the PC version of Sonic Adventure 2.

Written in Rust and TypeScript with [Tauri](https://tauri.app/).

## Running

Assuming one of `npm`/`pnpm`/`yarn`/etc. is already installed:

`pnpm install`

`pnpm tauri dev`

Drag and drop your Chao garden save file into the application window.

## Development

This project is mostly just a hobby project to play around with Rust more, but I'm open to suggestions or contributions.

## Screenshots

![Editing Stats](https://drive.google.com/uc?export=view&id=1n7t9xgkdWdhoNrQ5BXN7HNTNDW6w0KLu)
![Editing Appearance](https://drive.google.com/uc?export=view&id=1rXETOkVrl4w3xok1ZBNRNChLsOXxDPtC)

## Acknowledgements

[Froody](https://github.com/dfrood) for their [SA2SaveUtility](https://github.com/dfrood/SA2SaveUtility) project, which provided useful information regarding data structure and entity IDs, as well as the necessary cryptography code, which has been rewritten in Rust in this project.

## License

This project is licensed under the [MIT license](LICENSE).

This project contains files licensed under the [GNU GPL v3](licenses/gnugplv3.txt)
