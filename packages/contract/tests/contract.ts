import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Contract } from "../target/types/contract";

describe("contract", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const prod = anchor.getProvider()

  const program = anchor.workspace.Contract as Program<Contract>;
  console.log(program);

  it("Is initialized!", async () => {
    // create a new blog
    const [pda] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("n3bw3s"),
        Buffer.from("blog"),
        prod.publicKey.toBuffer(),
      ],
      program.programId
    );
    console.log("Program ID ", program.programId.toBase58());
    console.log("Your BLOG Address PDA", pda.toBase58());

    const tx = await program.methods
      .initBlog("viandwi24 blog")
      .accounts({
        blogAccount: pda,
      })
      .rpc()
    console.log("Your transaction signature", tx);
  });
});
