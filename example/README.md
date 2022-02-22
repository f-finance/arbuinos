To run this example please do following steps:

In the root folder install deps and locally link it:

```bash
npm install
npm link
```

then go to the __example__ folded and link the module there:

```bash
cd examples
npm link arbuinos
```

then copy __env.mjs.example__ as __env.mjs__:

```bash
cp env.mjs.example env.mjs
```

edit __env.mjs__ example with you favourite editor to put your private key into it and run the script wth Node:

```bash
node index.mjs
```




