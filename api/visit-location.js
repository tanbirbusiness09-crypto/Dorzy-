import { locationWebResponse } from '../server/visit-location.js';

// Vercel's Node.js Web API handler. The same resolver powers local Vite.
export default { fetch: request => locationWebResponse(request) };
