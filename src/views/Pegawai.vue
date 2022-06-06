<template>
  <main class="Pegawai-page">
    <div class="table-responsive">
      <div class="
          d-flex
          justify-content-between
          flex-wrap flex-md-nowrap
          align-items-center
          pt-3
          pb-2
          mb-3
          border-bottom
        ">
        <h1 class="h2">Daftar Seluruh Pegawai</h1>
      </div>
      <table class="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nama</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <a
                href="#"
                class="badge bg-info text-decoration-none"
              ><span class="bi bi-list"></span>
              </a>
              <a
                href="#"
                class="badge bg-warning text-decoration-none"
              ><span class="bi bi-pencil-square"></span>
              </a>
              <a
                href="#"
                class="badge bg-danger text-decoration-none"
              ><span class="bi bi-trash-fill"></span>
              </a>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>