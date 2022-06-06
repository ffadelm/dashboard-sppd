<template>
  <main class="home-page">
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
      <h1 class="h2">Dashboard</h1>
    </div>
    <div class="dashboard row col-lg-8">
      <div class="col-md-4">
        <div class="card bg-success mb-3">
          <div class="card-body text-white">
            <h5 class="card-title">Terbaru</h5>
            <p class="card-text">5</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-danger">
          <div class="card-body text-white">
            <h5 class="card-title">Selesai</h5>
            <p class="card-text">10</p>
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive mt-3">
      <table class="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
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