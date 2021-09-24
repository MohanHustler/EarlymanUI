export default class MarketingWebsite {
  constructor() {
    this.baseUrl = 'http://localhost:8080/v1/em';
    // this.baseUrl = 'http://15.206.168.225/v1/em';
  }
  getRequest = async (params) => {
    try {
      let response = await fetch(params.url);
      response = await response.json();
      return response;
    } catch (error) {
      return { error };
    }
  };

  getHome = async () => {
    const url = `${this.baseUrl}/home`;
    const { data, headers, error, status } = await this.getRequest({
      url
    });

    if (status === 200) {
      return {
        data,
        error: null,
        headers,
        status
      };
    }

    return {
      data,
      error: error || data,
      status
    };
  };

  getAbout = async () => {
    const url = `${this.baseUrl}/about`;
    const { data, headers, error, status } = await this.getRequest({
      url
    });

    if (status === 200) {
      return {
        data,
        error: null,
        headers,
        status
      };
    }

    return {
      data,
      error: error || data,
      status
    };
  };

  getContent = async () => {
    const url = `${this.baseUrl}/content`;
    const { data, headers, error, status } = await this.getRequest({
      url
    });

    if (status === 200) {
      return {
        data,
        error: null,
        headers,
        status
      };
    }

    return {
      data,
      error: error || data,
      status
    };
  };

  getDirector = async () => {
    const url = `${this.baseUrl}/director`;
    const { data, headers, error, status } = await this.getRequest({
      url
    });

    if (status === 200) {
      return {
        data,
        error: null,
        headers,
        status
      };
    }

    return {
      data,
      error: error || data,
      status
    };
  };
}
