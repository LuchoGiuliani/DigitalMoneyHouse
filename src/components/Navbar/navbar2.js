<div className={`${navbarClass} flex justify-between px-4 py-3 items-center  `}>
      <section>
        <Link href={"/"}>
          <Image
            className="w-auto h-auto"
            src={logoSrc}
            alt="Logo"
            width={96}
            height={43}
            priority
          />
        </Link>
      </section>
      <section className="flex gap-4 items-center">
        {pathname === "/register" ? (
          <Link
            href={"/login"}
            className={`${loginButtom}`}
          >
            Ingresar
          </Link>
        ) : isAuthenticated() && isLandingPage ? (
          <>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <Link href="/dashboard" className="text-white flex gap-2">
                <div className="bg-color-primary text-black px-2 rounded-md">
                  {userData?.firstname[0].toUpperCase()}
                  {userData?.lastname[0].toUpperCase()}
                </div>

                <Image
                  className="w-auto h-auto block md:hidden"
                  src={"/menuBurger.png"}
                  alt="burger"
                  width={96}
                  height={43}
                  priority
                />
                <h1 className={` hidden md:block`}>
                  Hola, {userData?.firstname ? userData.firstname : ""} bienvenido
                </h1>
              </Link>
            )}
            <button
              onClick={logout}
              className={`${loginButtom}`}
            >
              Logout
            </button>
          </>
        ) : (
          <div className={` flex gap-2`}>
            <Link
              href={"/login"}
              className={`${loginButtom}`}
            >
              Ingresar
            </Link>
            {isLandingPage ?  <Link
              href={"/register"}
              className={`bg-color-primary rounded-md text-color-darker font-bold p-2`}
            >
              Crear Cuenta
            </Link> : <div> </div>}
            {isRegister ?  <Link
            href={"/login"}
            className={`bg-color-dark text-white p-2`}
          >
            Iniciar sesion
          </Link> : <div> </div>}
           
          </div>
        )}
      </section>
    </div>  