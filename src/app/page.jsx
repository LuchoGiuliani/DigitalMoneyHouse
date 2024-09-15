export default function Home() {
  return (
    <main className="background_hero relative ">
     
      <div className="bg-color-primary absolute bottom-0 w-full tablet:h-[148px] h-[148px] rounded-t-2xl"></div>
      <section className="w-[60%] h-[50%] pt-8 pl-5 md:pl-6 flex flex-col gap-2 ">
        <h1 className="text-white font-semibold tablet:text-[48px] md:leading-10 text-[27px] leading-6 md:font-normal">
          De ahora en <br /> adelante, hacés <br className="" /> más con tu
          dinero
        </h1>
        <div className="border border-color-primary w-6 md:hidden"></div>
        <h2 className="text-color-primary md:text-[34px] leading-8">
          Tu nueva{" "}
          <span className="font-bold text-[22px] md:text-[34px] md:leading-10">
            <br className="md:hidden" /> billetera virtual
          </span>
        </h2>
      </section>
      <section className="flex flex-col justify-center tablet:flex-row w-full gap-4  px-6 text-[18px] md:text-[22px] absolute bottom-4 ">
        <div className="bg-white rounded-xl max-w-[500px] max-h-[246px] p-4 ">
          <h1 className="desktop:text-[32px]  font-bold pb-2">
            Transferí dinero
          </h1>
          <h2 className="border-t-2 border-t-color-primary pt-2">
            Desde Digital Money House vas a poder transferir dinero a otras
            cuentas, así como también recibir transferencias y nuclear tu
            capital en nuestra billetera virtual
          </h2>
        </div>
        <div className="bg-white rounded-xl max-w-[500px] max-h-[246px] p-4">
          <h1 className="desktop:text-[32px]  font-bold pb-2">
            Pago de servicios
          </h1>
          <h2 className="border-t-2 border-t-color-primary pt-2">
            Pagá mensualmente los servicios en 3 simples clicks. Fácil, rápido y
            conveniente. Olvidate de las facturas en papel
          </h2>
        </div>
      </section>
    </main>
  );
}
