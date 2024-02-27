<script lang="ts">
  let formState = $state<'idle' | 'loading' | 'done' | 'error'>('idle');

  let firstname = $state('');
  let lastname = $state('');
  let gender = $state('');

  function clearForm() {
    firstname = '';
    lastname = '';
    gender = '';
  }

  async function sendForm() {
    formState = 'loading';
    const response = await fetch('http://localhost:3000/createUser', {
      method: 'POST',
      body: JSON.stringify({
        firstname,
        lastname,
        gender
      })
    });
    if (response.status === 200) {
      formState = 'done';
      clearForm();
    } else {
      formState = 'error';
      alert('ERROR');
    }
  }
</script>

<a href="/">กลับหน้าแรก</a>

<h1>ลงทะเบียน</h1>

<pre>{formState}</pre>

<form on:submit={() => sendForm()}>
  <div>
    <label for="firstname">ชื่อจริง</label>
    <input type="text" name="firstname" bind:value={firstname} required />
  </div>
  <div>
    <label for="lastname">สกุล</label>
    <input type="text" name="lastname" bind:value={lastname} required />
  </div>
  <div>
    <label for="gender">เพศ</label>
    <label>
      <input type="radio" name="gender" value="male" bind:group={gender} required />
      ชาย
    </label>
    <label>
      <input type="radio" name="gender" value="female" bind:group={gender} required />
      หญิง
    </label>
  </div>
  <div>
    <button type="submit">ส่ง</button>
  </div>
</form>

{#if formState === 'done'}
  <div>
    การลงทะเบียนสำเร็จ ตรวจสอบข้อมูลได้

    <a href="/users">ตรวจสอบข้อมูล</a>
  </div>
{/if}

<style>
  label {
    display: block;
  }
</style>
