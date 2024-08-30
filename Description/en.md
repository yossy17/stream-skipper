This script provides functionality to automatically skip intros and endings for the following services:

- [Prime Video](https://amazon.co.jp/gp/video/storefront)
- [Netflix](https://netflix.com)

## Usage

You can change settings with shortcut keys.  
The last two individual settings can only be changed when the overall skip function is turned `ON`.

- `Alt + n`: Toggle the overall skip function `ON`/`OFF`.
- `Alt + x`: Toggle intro skipping `ON`/`OFF`.
- `Alt + c`: Toggle ending skipping `ON`/`OFF`.

The script status can be checked on the HUD displayed at the top-left corner of the screen.  
The HUD displays the current status of intro and ending skipping.

---

## Contributing

Bug reports and feature suggestions are welcome. Please [open an issue](https://github.com/yossy17/streaming-video-skipper/issues) or [create a pull request](https://github.com/yossy17/streaming-video-skipper/pulls).

This script operates on a simple mechanism of specifying the class name of button elements and physically clicking those elements.
Therefore, it can basically function on streaming services that have buttons like `Skip Intro` or `Next Episode`.
However, as I'm not subscribed to many services myself, I don't have a way to know these elements.
By adding to the code, this script alone can be made compatible with more services.
If possible, I would appreciate if you could provide the selectors for each service, as this would help improve the service.

## License

This project is released under the MIT License.
