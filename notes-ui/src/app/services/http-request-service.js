class HttpRequestService {

  constructor($http, $log) {
    'ngInject';

    this.$http = $http;
    this.$log = $log;
    this.apiRoute = "http://localhost:3200"; // need to be parameterized build

    console.log('http service initialized');
  }

  // Using async
  async getDataByIdAsync(endPoint, id) {
    const response = await this.$http({
      method: 'GET',
      url: `${this.apiRoute}/${endPoint}/${id}`,
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('response is:', response);
    return response.data;
  }

  // Using promises
  getDataById(endPoint, id) {
    return this.$http({
      method: 'GET',
      url: `${this.apiRoute}/${endPoint}/${id}`,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.data)
    .catch(error => this.$log.error('http-request-service - getDataById() failed!', error));
  }

  getData(endPoint, params = null) {
    return this.$http({
      method: 'GET',
      url: `${this.apiRoute}/${endPoint}`,
      headers: {
        'Content-Type': 'application/json'
      },
      params: params ? {params} : {}
    }).then(response => response.data)
      .catch(error => this.$log.error('http-request-service - getData() failed!'));
  }

  putData(endPoint, data) {
    return this.$http({
      method: 'PUT',
      url: `${this.apiRoute}/${endPoint}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: this.loopBackAuth.accessTokenId
      },
      data: data
    }).then(response => response)
      .catch(error => {
        this.$log.error('http-request-service - putData() failed!', error);
      });
  }


}

export default HttpRequestService;
