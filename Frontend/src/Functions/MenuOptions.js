export function setOptionsByRol(rol, collapse, changeSelected) {
  // STATIC LABELS
  const USERS = (
    <div key='s1' id='s1' className='m-menu-static-label'>
      <img className='m-icon' src='./person_gray.png' alt='person' />
      <span className='m-label'>Usuarios</span>
      <img
        id='header-1'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )

  const LIST = (
    <div key='s2' id='s2' className='m-menu-static-label'>
      <img className='m-icon' src='./add-list-48.png' alt='person' />
      <span className='m-label'>Mis listas</span>
      <img
        id='header-2'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )

  const CATEGORIES = (
    <div key='s3' id='s3' className='m-menu-static-label'>
      <img className='m-icon' src='./add-folder-48.png' alt='person' />
      <span className='m-label'>Categorías</span>
      <img
        id='header-3'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )

  const PAGES = (
    <div key='s4' id='s4' className='m-menu-static-label'>
      <img className='m-icon' src='./pages-1-48.png' alt='person' />
      <span className='m-label'>Mis páginas</span>
      <img
        id='header-4'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )

  const SHAREDLIST = (
    <div key='s5' id='s5' className='m-menu-static-label'>
      <img className='m-icon' src='./add-list-48.png' alt='person' />
      <span className='m-label'>Listas compartidas</span>
      <img
        id='header-5'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )

  const SHAREDPAGES = (
    <div key='s6' id='s6' className='m-menu-static-label'>
      <img className='m-icon' src='./pages-1-48.png' alt='person' />
      <span className='m-label'>Paginas compartidas</span>
      <img
        id='header-6'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )

  // GROUP LABELS
  // USERS
  const LIST_USERS_LABEL = (
    <div key='l1' id={1} className='m-menu-label' onClick={changeSelected}>
      Listar usuarios
    </div>
  )

  const CREATE_USER_LABEL = (
    <div key='l2' id={2} className='m-menu-label' onClick={changeSelected}>
      Crear usuario
    </div>
  )


  //CATEGORIES
  const CREATE_CATEGORIES_LABEL = (
    <div key='l3' id={3} className='m-menu-label' onClick={changeSelected}>
      Crear Categoría
    </div>
  )

  const LIST_CATEGORIES_LABEL = (
    <div key='l6' id={6} className='m-menu-label' onClick={changeSelected}>
      Listar Categorías
    </div>
  )

  //PAGES
  const LIST_LIST_LABEL = (
    <div key='l4' id={4} className='m-menu-label' onClick={changeSelected}>
      Listas
    </div>
  )
  const CREATE_LIST_LABEL = (
    <div key='l5' id={5} className='m-menu-label' onClick={changeSelected}>
      Crear lista
    </div>
  )

  const LIST_PAGES_LABEL = (
    <div key='l7' id={7} className='m-menu-label' onClick={changeSelected}>
      Páginas
    </div>
  )

  const LIST_SHAREDLIST_LABEL = (
    <div key='l8' id={8} className='m-menu-label' onClick={changeSelected}>
      Listas Compartidas
    </div>
  )
  
  const LIST_SHAREDPAGES_LABEL = (
    <div key='l9' id={9} className='m-menu-label' onClick={changeSelected}>
      Paginas Compartidas
    </div>
  )


  // GROUPS
  // USERS
  const USERS_GROUP = (
    <div
      key='g1'
      id='group-1'
      className='m-menu-group'
      style={{ display: 'none' }}
    >
      {LIST_USERS_LABEL}
      {CREATE_USER_LABEL}
    </div>
  )

  // USERS
  const LIST_GROUP = (
    <div
      key='g2'
      id='group-2'
      className='m-menu-group'
      style={{ display: 'none' }}
    >
      {LIST_LIST_LABEL}
      {CREATE_LIST_LABEL}
    </div>
  )

  //CATEGORIES
  const CATEGORIES_GROUP = (
    <div
      key='g3'
      id='group-3'
      className='m-menu-group'
      style={{ display: 'none' }}
    >
      
      {LIST_CATEGORIES_LABEL}
      {CREATE_CATEGORIES_LABEL}
    </div>
  )

  //CATEGORIES
  const PAGES_GROUP = (
    <div
      key='g4'
      id='group-4'
      className='m-menu-group'
      style={{ display: 'none' }}
    >
      {LIST_PAGES_LABEL}
    </div>
  )

  const LIST_SHAREDLIST_GROUP = (
    <div
      key='g5'
      id='group-5'
      className='m-menu-group'
      style={{ display: 'none' }}
    >
      {LIST_SHAREDLIST_LABEL}
    </div>

  )

  const LIST_SHAREDPAGES_GROUP = (
    <div
      key='g6'
      id='group-6'
      className='m-menu-group'
      style={{ display: 'none' }}
    >
      {LIST_SHAREDPAGES_LABEL}
    </div>

  )

  let array = []

  switch (rol) {
    case 'Administrador':
      array.push(USERS)
      array.push(USERS_GROUP)
      array.push(CATEGORIES)
      array.push(CATEGORIES_GROUP)
      array.push(LIST)
      array.push(LIST_GROUP)
      array.push(PAGES)
      array.push(PAGES_GROUP)
      array.push(SHAREDLIST)
      array.push(LIST_SHAREDLIST_GROUP)
      array.push(SHAREDPAGES)
      array.push(LIST_SHAREDPAGES_GROUP)


      return array
    
    case 'Usuario':
      array.push(LIST)
      array.push(LIST_GROUP)
      array.push(PAGES)
      array.push(PAGES_GROUP)
      array.push(SHAREDLIST)
      array.push(LIST_SHAREDLIST_GROUP)
      array.push(SHAREDPAGES)
      array.push(LIST_SHAREDPAGES_GROUP)

      return array

    default:

      return array
  }
}
