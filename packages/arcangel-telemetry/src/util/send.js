import TelemetryDispatcher from "./telemetry-dispatcher"

const ARCANGEL_TELEMETRY_HOST = process.env.ARCANGEL_TELEMETRY_HOST || ""
const ARCANGEL_TELEMETRY_PATH = process.env.ARCANGEL_TELEMETRY_PATH || ""

const dispatcher = new TelemetryDispatcher({
  host: ARCANGEL_TELEMETRY_HOST,
  path: ARCANGEL_TELEMETRY_PATH,
})
dispatcher.dispatch()
