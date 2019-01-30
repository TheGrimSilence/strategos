import { VerboseStyle, VerboseLevel } from './verbose';

export function vError(
  msg: string,
  style?: VerboseStyle,
  level?: VerboseLevel,
) {
  switch (level) {
    case VerboseLevel.General:
      switch (style) {
        case VerboseStyle.Rails:
          break;

        case VerboseStyle.RaspPi:
          break;

        case VerboseStyle.Yarn:
          break;

        case VerboseStyle.Npm:
          break;
        // Here we just default to Xploration style
        default:
          break;
      }
      break;

    case VerboseLevel.Instantiation:
      switch (style) {
        case VerboseStyle.Rails:
          break;

        case VerboseStyle.RaspPi:
          break;

        case VerboseStyle.Yarn:
          break;

        case VerboseStyle.Npm:
          break;
        // Here we just default to Xploration style
        default:
          break;
      }
      break;

    default:
      break;
  }
}

export function vInfo(
  msg: string,
  style?: VerboseStyle,
  level?: VerboseLevel,
) {}

export function vWarn(
  msg: string,
  style?: VerboseStyle,
  level?: VerboseLevel,
) {}
