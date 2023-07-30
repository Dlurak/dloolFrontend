<script  lang="ts">
    let submitButton: HTMLInputElement;
    let usernameValue: string;
    let passwordValue: string;
</script>

<h3>Welcome Back</h3>

<form>
    <div>
        <label for="username">Username</label>
        <input type="text" name="username" bind:value={usernameValue}>
    </div>
    <div>
        <label for="username">Password</label>
        <input type="password" bind:value={passwordValue}>
    </div>
    <input type="submit" value="Login" bind:this={submitButton}>
</form>

<!-- TODO: Style -->