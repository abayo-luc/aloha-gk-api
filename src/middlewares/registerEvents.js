import { EventEmitter } from "events";
import ImageHelper from "../helpers/Image";
export const appEvents = new EventEmitter();

export default () => {
  appEvents.on("update_product_image", ImageHelper.updateImage);
};
