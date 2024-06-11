<template>
  <div class="primary-navbar">
    <div class="container">
      <div class="row">
        <ul>
          <li>
            <router-link to="/user" active-class="active">
              <i class="fa fa-users"></i> User
            </router-link>
          </li>
          <li>
            <router-link to="/department" active-class="active">
              <i class="fa fa-users"></i> Department
            </router-link>
          </li>
          <li>
            <router-link to="/chatlog" active-class="active">
              <i class="fa fa-users"></i> Chat Log
            </router-link>
          </li>
          <li style="display:none">
            <router-link to="/setting" active-class="active">
              <i class="fa fa-users"></i> Setting
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
