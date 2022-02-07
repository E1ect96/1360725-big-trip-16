const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get points() {
    return this.#load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  updatePoint = async (point) => {
    const response = await this.#load({
      url: `tasks/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  #adaptToServer = (point) => {
    const adaptedTripPoint = {...point,

      'date_from': point.time.start.toISOString(),
      'date_to': point.time.end.toISOString(),
      'base_price': point.price,
      'offers': point.additionalOptions,
      'destination': point.destinationInfo,
      'is_favorite': point.isFavorite,
    };

    // Ненужные ключи мы удаляем
    delete adaptedTripPoint.time;
    delete adaptedTripPoint.price;
    delete adaptedTripPoint.isFavorite;
    delete adaptedTripPoint.additionalOptions;
    delete adaptedTripPoint.destinationInfo;

    return adaptedTripPoint;
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}
