<div>
            <div>
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    onChange={handleInputChange}
                    type="search"
                    id="default-search"
                    className="px-5 w-[350px] p-3 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Mahsulod qidirish...."
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            {skip && (
              <div className=" transition duration-150 ease-out md:ease-in absolute -z-50  w-[100%] h-[100vh]">
                {/* <NavLink className="" to={`/product/${product?.id}`}>
                  <button className="btn btn-sm m-3 border-primary">
                    <span className="fa fa-arrow-right text-muted" />
                  </button>
                </NavLink> */}

                <div className="bg-white absolute px-6 rounded shadow-lg flex flex-col w-[350px] h-[200px] overflow-x-auto sx:overflow-y-auto sx:h-[30vh]">
                  {data?.result?.categories?.map((value) => {
                    return (
                      <div>
                        <NavLink
                          className={"no-underline"}
                          to={`/categories/${value?.id}`}
                        >
                          <p className="flex items-center gap-2 cursor-pointer ">
                            <span>
                              {" "}
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                              </svg>
                            </span>{" "}
                            {value?.title}
                          </p>
                        </NavLink>
                      </div>
                    );
                  })}
                  {data?.result?.products?.map((value) => {
                    return (
                      <div>
                        <NavLink
                          className="no-underline"
                          to={`/product/${value?.id}`}
                        >
                          <p className="flex items-center gap-2 cursor-pointer">
                            <span>
                              {" "}
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                              </svg>
                            </span>{" "}
                            {value?.title}
                          </p>
                        </NavLink>
                      </div>
                    );
                  })}

                  {data?.result?.subcategories?.map((value) => {
                    return (
                      <div>
                        <p className="flex items-center gap-2 cursor-pointer">
                          <span>
                            {" "}
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                            </svg>
                          </span>{" "}
                          {value?.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>