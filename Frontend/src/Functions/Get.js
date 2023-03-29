import {
  HOST,
  LIST_WAREHOUSES,
  LIST_LISTS,
  ARTICLE_TYPE_LIST,
  LIST_ARTICLES,
  LIST_BORROWINGS,
  DAY_IN_MS,
  NO_ITEMS_ERROR,
  INVALID_CLASSIF_ERROR,
  LIST_CATEGORY,
} from './Constants'

function handleErrors(response) {
  if (response.status >= 500) {
    throw Error(response.statusText)
  }
  return response
}

export function getCategories(responseHandler) {
  /* let data_stored = getFromStorage('categories', responseHandler)
  if (data_stored != null) {
    return responseHandler('success', data_stored)
  } */

  let url = HOST + LIST_CATEGORY
  fetch(url, {
    method: 'GET',
    headers: {
      token:sessionStorage.getItem('token'),
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let validation = validateResponse(response)
      if(validation != null) {
        return responseHandler('error', validation)
      }

      let categories = []
      let data = response.data
      for (let i = 0; i < data.length; i++) {
        let obj = data[i]
        categories.push({
          value: obj.id,
          title: obj.title
        })
      }
      let json = JSON.stringify(categories)
      sessionStorage.setItem('categories', json)
      return responseHandler('success', categories)
    })
    .catch((error) => responseHandler('error', error))
}

export function getLists(session_id, responseHandler) {
  /* let data_stored = getFromStorage('categories', responseHandler)
  if (data_stored != null) {
    return responseHandler('success', data_stored)
  } */
  let url = HOST + LIST_LISTS + '?user_id=' + session_id
  fetch(url, {
    method: 'GET',
    headers: {
      token:sessionStorage.getItem('token'),
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let validation = validateResponse(response)
      if(validation != null) {
        return responseHandler('error', validation)
      }

      let lists = []
      let data = response.data
      for (let i = 0; i < data.length; i++) {
        let obj = data[i]
        lists.push({
          value: obj.id,
          title: obj.name
        })
      }
      let json = JSON.stringify(lists)
      sessionStorage.setItem('lists', json)
      return responseHandler('success', lists)
    })
    .catch((error) => responseHandler('error', error))
}


function getFromStorage(key) {
  let session_object = sessionStorage.getItem(key)
  let json_object = JSON.parse(session_object)

  if (json_object && json_object.length > 0) {
    return json_object
  }

  return null
}

function validateResponse(response) {
  if (response.hasOwnProperty('error')) {
    return response.error
  }

  if (!response.hasOwnProperty('rows')) {
    if (response.length < 1) {
      return NO_ITEMS_ERROR
    }

    return null
  }

  let rows = response.rows
  if (rows.length < 1) {
    return NO_ITEMS_ERROR
  }

  return null
}

// SIMPLE GET REQUESTS
export function getElementById(path, responseHandler) {
  // Path should have id as param
  let url = HOST + path

  fetch(url, {
    method: 'GET',
    headers: {
      token: sessionStorage.getItem('token'),
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      if (response.hasOwnProperty('error')) {
        return responseHandler('error', response.error)
      }

      if (response.hasOwnProperty('rows')) {
        return responseHandler('success', response.rows[0])
      }

      return responseHandler('success', response[0])
    })
    .catch((error) => responseHandler('error', error))
}

export function getElements(key, path, responseHandler) {
  // Make the request if there is nothing stored
  let url = HOST + path
  fetch(url, {
    method: 'GET',
    headers: {
      token: sessionStorage.getItem('token'),
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let validation = validateResponse(response)
      if (validation != null) {
        return responseHandler('error', validation)
      }

      let rows = response.rows ? response.rows : response
      let json = JSON.stringify(rows)
      sessionStorage.setItem(key, json)

      return responseHandler('success', rows)
    })
    .catch((error) => responseHandler('error', error))
}

