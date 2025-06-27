// js/logger.js
export function logAction(action) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ACTION: ${action}`);
}
