# Simple Serverless api on Google Cloud Run

- https://cloud.google.com/run/docs/quickstarts/deploy-continuously

Trigger on `main` and `develop` branches

Published here:

- main:

  - https://test-tun.giona.tech (throw Coudflare Tunnel)
  - https://test-tun-zt.giona.tech (throw Cloudflare Tunnel behind Zero Trust)

- develop:

  - https://test.giona.tech (simple cname record, bypassing tunnel)
  - https://api-1-test-r25tir2erq-ez.a.run.app (published by Google)

## with db tunnel over https

- https://developers.cloudflare.com/cloudflare-one/applications/non-http/arbitrary-tcp/

## expose throw cloudflare tunnel

- https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/configure-tunnels/local-management/as-a-service/linux
