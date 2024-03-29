import axios from "axios";
import {
  CrudFilters,
  CrudOperators,
  DataProvider,
  HttpError,
} from "@refinedev/core";
import { stringify } from "query-string";

// Error handling with axios interceptors
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

// Map Refine operators to API operators
/**
"ne":
Stands for "not equal."
Maps to _ne in the API query string.
Example: name_ne=John (find records where name is not "John")

"gte":
Stands for "greater than or equal to."
Maps to _gte in the API query string
Example: age_gte=30 (find records where age is 30 or older)

"lte":
Stands for "less than or equal to."
Maps to _lte in the API query string
Example: price_lte=100 (find records where price is 100 or less)

"contains":
Checks for partial text matches.
Maps to _like in the API query string (assuming the API uses "_like" for partial matches).
Example: email_like=@gmail.com (find records where email contains "@gmail.com")

"eq":
Stands for "equal to."
Doesn't require mapping in this API, so it returns an empty string.
Example: status=active (find records where status is "active")
 */
const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "ne":
    case "gte":
    case "lte":
      return `_${operator}`;
    case "contains":
      return "_like";
    case "eq":
    default:
      return "";
  }
};
const generateFilters = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};

  filters?.map((filter): void => {
    if ("field" in filter) {
      const { field, operator, value } = filter;
      const mappedOperator = mapOperator(operator);
      queryFilters[`${field}${mappedOperator}`] = value;
    }
  });

  return queryFilters;
};

export const dataProvider = (apiUrl: string): DataProvider => ({
  getApiUrl: () => apiUrl,

  // ...
  getList: async ({ resource, pagination, sorters, filters }) => {
    const url = `${apiUrl}/${resource}`;

    const { current = 1, pageSize = 10 } = pagination ?? {};

    const query: {
      _start?: number;
      _end?: number;
      _sort?: string;
      _order?: string;
    } = {
      _start: (current - 1) * pageSize,
      _end: current * pageSize,
    };
    if (sorters && sorters.length > 0) {
      query._sort = sorters[0].field;
      query._order = sorters[0].order;
    }
    const queryFilters = generateFilters(filters);
    const { data, headers } = await axiosInstance.get(
      `${url}?${stringify(query)}&${stringify(queryFilters)}`
    );

    const total = +headers["x-total-count"];

    return {
      data,
      total,
    };
  },
  // ...
  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await axiosInstance.post(url, variables);

    return {
      data,
    };
  },
  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.patch(url, variables);

    return {
      data,
    };
  },
  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.delete(url, {
      data: variables,
    });

    return {
      data,
    };
  },
  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.get(url);

    return {
      data,
    };
  },
  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let requestUrl = `${url}?`;

    if (sorters && sorters.length > 0) {
      const sortQuery = {
        _sort: sorters[0].field,
        _order: sorters[0].order,
      };
      requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
    }

    if (filters) {
      const filterQuery = generateFilters(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await axiosInstance[method](url, payload, {
          headers,
        });
        break;
      case "delete":
        axiosResponse = await axiosInstance.delete(url, {
          data: payload,
          headers: headers,
        });
        break;
      default:
        axiosResponse = await axiosInstance.get(requestUrl, {
          headers,
        });
        break;
    }

    const { data } = axiosResponse;

    return { data };
  },
  getMany: async ({ resource, ids }) => {
    const { data } = await axiosInstance.get(
      `${apiUrl}/${resource}?${stringify({ id: ids })}`
    );

    return {
      data,
    };
  },
  createMany: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}/bulk`;
    const { data } = await axiosInstance.post(url, { values: variables });

    return {
      data,
    };
  },
  deleteMany: async ({ resource, ids }) => {
    const url = `${apiUrl}/${resource}/bulk?ids=${ids.join(",")}`;
    const { data } = await axiosInstance.delete(url);

    return {
      data,
    };
  },
  updateMany: async ({ resource, ids, variables }) => {
    const url = `${apiUrl}/${resource}/bulk`;
    const { data } = await axiosInstance.patch(url, { ids, variables });

    return {
      data,
    };
  },
});
