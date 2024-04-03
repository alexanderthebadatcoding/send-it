import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { handle } from "frog/vercel";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  browserLocation: "/",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

app.frame("/", (c) => {
  // const { buttonValue, status } = c;
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#CCFF00",
          color: "black",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="246"
          height="249"
          fill="none"
          viewBox="0 0 446 449"
        >
          <path
            fill="#000"
            d="M0 366.086l251.5-252H66V.586h379.172v380H334.5v-185l-253 252.5-81.5-82z"
          ></path>
        </svg>
        <div
          style={{
            color: "black",
            fontSize: 170,
            fontStyle: "bolder",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            fontWeight: "bolder",
          }}
        >
          Send it
        </div>
      </div>
    ),
    intents: [
      <Button value="sendit" action="/sendit0">
        Send It
      </Button>,
      <Button value="credits" action="/credits">
        Credits
      </Button>,
    ],
  });
});

for (let i = 0; i < 20; i++) {
  app.frame(`/sendit${i}`, (c) => {
    let backAction = i > 0 ? `/sendit${i - 1}` : `/`;
    // Define the action for the "next" button
    let nextAction = i < 20 - 1 ? `/sendit${i + 1}` : null;
    return c.res({
      action: "/",
      image: `/sendit${i}.png`,
      intents: [
        <Button value="back" action={backAction}>
          Back
        </Button>,
        <Button.Link href={`https://sendit.funfra.me/sendit${i}.png`}>Image</Button.Link>,
        nextAction ? (
          <Button value="next" action={nextAction}>
            Next
          </Button>
        ) : (
          <Button.Reset>Reset</Button.Reset>
        ),
      ].filter(Boolean),
    });
  });
}

app.frame("/credits", (c) => {
  // const { buttonValue, status } = c;
  return c.res({
    image: "/credits.png",
    intents: [
      <Button value="back" action="/">
        Back
      </Button>,
      <Button.Link href="https://github.com/alexanderthebadatcoding/send-it">
        Github
      </Button.Link>,
    ],
  });
});

if (import.meta.env?.MODE === "development") devtools(app, { serveStatic });
else devtools(app, { assetsPath: "/.frog" });

export const GET = handle(app);
export const POST = handle(app);
