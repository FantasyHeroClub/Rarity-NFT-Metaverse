async function main() {
    //Compile
    await hre.run("clean");
    await hre.run("compile");

    const rarityAddr = "0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb";
    const theRarityForestAddr = "0xb37d3d79ea86B0334d9322c695339D577A3D57be";

    //Deploy
    const TheRarityForestV2 = await ethers.getContractFactory("TheRarityForestV2");
    const theRarityForestV2 = await TheRarityForestV2.deploy(rarityAddr, theRarityForestAddr);
    await theRarityForestV2.deployed();
    console.log("Deployed to:", theRarityForestV2.address);

    //Verify
    await hre.run("verify:verify", {
        address: theRarityForestV2.address,
        constructorArguments: [rarityAddr, theRarityForestAddr],
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });