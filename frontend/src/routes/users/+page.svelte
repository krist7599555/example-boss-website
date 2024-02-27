<script lang="ts">
  import { onMount } from 'svelte';

  let dataState = $state<'loading' | 'done' | 'error'>('loading');
  let users = $state<{ firstname: string; lastname: string; gender: string; id: number }[]>([]);

  onMount(async () => {
    const response = await fetch('http://localhost:3000/users');
    if (response.status !== 200) {
      dataState = 'error';
    } else {
      dataState = 'done';
      const data = await response.json();
      users = data;
    }
  });
</script>

<a href="/">กลับหน้าแรก</a>

<h1>ลูกค้าทั้งหมด</h1>

<div>{dataState}</div>

<table>
  <thead>
    <tr>
      <th>id</th>
      <th>ชื่อ</th>
      <th>สกุล</th>
      <th>เพศ</th>
    </tr>
  </thead>
  <tbody>
    {#each users as user (user.id)}
      <tr>
        <td>{user.id}</td>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.gender}</td>
      </tr>
    {/each}
  </tbody>
</table>
