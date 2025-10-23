import { unlink } from "fs/promises"

export async function deleteFile(pathname) {
  try {
    await unlink(pathname)
  } catch (e) { }
}