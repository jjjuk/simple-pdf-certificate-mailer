require('dotenv').config()
const html = `
<head>
  <style type="text/css">
    * {
      box-sizing: border-box;
    }

    :root {
      --background: white;

      --primary: #ff1ead;
      --secondary: #1effc3;

      --card-size: 300px;
    }

    body {
      height: 100vh;
      margin: 0;
      display: grid;
      place-items: center;
      padding: 1rem;
      background: var(--background);
      font-family: 'Source Code Pro', monospace;

      text-rendering: optimizelegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .card {
      width: calc(var(--card-size) * 1.586);
      height: var(--card-size);

      border-radius: 0.75rem;
      box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56),
        0 0 0 1px rgba(0, 0, 0, 0.3);

      background: black;

      display: grid;
      grid-template-columns: 40% auto;
      color: white;

      align-items: center;

      will-change: transform;
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 32px 80px 14px rgba(0, 0, 0, 0.36),
          0 0 0 1px rgba(0, 0, 0, 0.3);
      }
    }

    .card-details {
      padding: 1rem;
    }

    .name {
      font-size: 1.25rem;
    }

    .occupation {
      font-weight: 600;
      color: var(--primary);
    }

    .card-avatar {
      display: grid;
      place-items: center;
    }

    svg {
      fill: white;
      width: 65%;
    }

    .card-about {
      margin-top: 1rem;
      display: grid;
      grid-auto-flow: column;
    }

    .item {
      display: flex;
      flex-direction: column;
      margin-bottom: 0.5rem;

      .value {
        font-size: 1rem;
      }

      .label {
        margin-top: 0.15rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--primary);
      }
    }

    .skills {
      display: flex;
      flex-direction: column;
      margin-top: 0.75rem;

      .label {
        font-size: 1rem;
        font-weight: 600;
        color: var(--primary);
      }

      .value {
        margin-top: 0.15rem;
        font-size: 0.75rem;
        line-height: 1.25rem;
      }
    }
    .avatar {
      border-radius: 50%;
      width: 170px;
      height: 170px;
      object-fit: cover;
      margin-left: 1.2em;
    }
  </style>
</head>

<body>
  <link
    href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400,500"
    rel="stylesheet"
  />

  <div class="card">
    <div class="card-avatar">
      <img class="avatar" src="${process.env.SERVER_URL}/templates/test/JGEJo8XYysY.jpg" />
    </div>
    <div class="card-details">
      <div class="name">Jenechka</div>
      <div class="occupation">hero</div>

      <div class="card-about">
        <div class="item">
          <span class="value">23</span>
          <span class="label">Age</span>
        </div>
        <div class="item">
          <span class="value">60 kg </span>
          <span class="label">Weight</span>
        </div>
        <div class="item">
          <span class="value">170 cm</span>
          <span class="label">Height</span>
        </div>
      </div>
      <div class="skills">
        <span class="value"
          >The cutest being alive.<br /><br />
          Hiding her face most of the time.</span
        >
      </div>
    </div>
  </div>
</body>

`

module.exports = {
  html,
}
