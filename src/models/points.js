export default class PointsModel {
  constructor() {
    this._points = [];

    this._dataChangeHandlers = [];
  }

  getPoints() {
    return this._points;
  }

  setPoints(points) {
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
  }

  updatePoint(id, point) {
    const newAllPoints = this._points.slice();

    if (!id) {
      return false;
    }

    let i = 0;
    let j = 0;

    newAllPoints.forEach((item, index1) => {
      item.forEach((it, index2) => {
        if (it.id === id) {
          it = point;
          i = index1;
          j = index2;
        }
      });
    });

    this._points[i][j] = point;

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
