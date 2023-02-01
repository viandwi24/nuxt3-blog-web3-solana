# Desentralize Blog Web3 With Nuxt & Solana
a decentral blog made using nuxt and solana with web3 concept

## Try to Develop
- clone this repo
- make sure you have `pnpm` and `solana cli` installed on your computer
- install node modules with `pnpm i`
- remove my contract folder `rm -rf packages/contract/target` because you must build your own contract
- build contract for first time use `cd packages/contract && anchor build`
- for first time after build, save your program id from prev step, and change this file with your new program id
  - `packages/contract/Anchor.toml`
    ```toml
    contract = "<YOUR_PROGRAM_ID>"
    ```
  - `packages/contract/programs/contract/src/lib.rs`
    ```toml
    declare_id!("<YOUR_PROGRAM_ID>");
    ```
- create new blog with run test in `packages/contract/tests/contract.ts` add save the blog pda address
- open `packages/client/composables/use-contract.ts` and change BLOG ADDRESS with your own blog pda address
- run client with `cd packages/client && pnpm dev` and open in your browser `localhost:3000`
