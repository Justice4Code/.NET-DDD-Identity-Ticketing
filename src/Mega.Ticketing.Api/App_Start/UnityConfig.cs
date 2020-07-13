using Mega.Ticketing.Domain;
using Mega.Ticketing.Domain.Entities;
using Mega.Ticketing.Domain.Interface;
using Mega.Ticketing.Domain.Service;
using Mega.Ticketing.Presistance;
using Mega.Ticketing.Presistance.Data;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Configuration;
using System.Data.Entity;
using Unity;
using Unity.Injection;
using Unity.Lifetime;

namespace Mega.Ticketing.Api
{
    /// <summary>
    /// Specifies the Unity configuration for the main container.
    /// </summary>
    public static class UnityConfig
    {
        #region Unity Container
        private static Lazy<IUnityContainer> container =
          new Lazy<IUnityContainer>(() =>
          {
              var container = new UnityContainer();
              RegisterTypes(container);
              return container;
          });

        /// <summary>
        /// Configured Unity Container.
        /// </summary>
        public static IUnityContainer Container => container.Value;
        #endregion

        /// <summary>
        /// Registers the type mappings with the Unity container.
        /// </summary>
        /// <param name="container">The unity container to configure.</param>
        /// <remarks>
        /// There is no need to register concrete types such as controllers or
        /// API controllers (unless you want to change the defaults), as Unity
        /// allows resolving a concrete type even if it was not previously
        /// registered.
        /// </remarks>
        public static void RegisterTypes(IUnityContainer container)
        {
            // NOTE: To load from web.config uncomment the line below.
            // Make sure to add a Unity.Configuration to the using statements.
            // container.LoadConfiguration();

            container.RegisterType<IUserStore<ApplicationUser>, UserStore<ApplicationUser>>();
            container.RegisterType<UserManager<ApplicationUser>>();
            container.RegisterType<DbContext, IdentityDbContext>();
            container.RegisterType<ApplicationUserManager>();


            container.RegisterType<IUnitOfWork, UnitOfWork>();
            container.RegisterType<ITicketingContext, TicketingContext>();
            container.RegisterType<IAccessoryRepository, AccessoryRepository>();
            container.RegisterType<ICartableRepository, CartableRepository>();
            container.RegisterType<ICategoryRepository, CategoryRepository>();
            container.RegisterType<ICompanyRepository, CompanyRepository>();
            container.RegisterType<IConversationRepository, ConversationRepository>();
            container.RegisterType<ITicketRepository, TicketRepository>();
            container.RegisterType<ICompanyService, CompanyService>();
            container.RegisterType<ICartableService, CartableService>();
            container.RegisterType<ICategoryService, CategoryService>();
            container.RegisterType<ITicketService, TicketService>();
            container.RegisterType<IConversationService, ConversationService>();



            var connectionString = ConfigurationManager.ConnectionStrings["Ticketing"].ConnectionString;
            container.RegisterType<ITicketingDbContextFactory, TicketingDbContextFactory>(
                new HierarchicalLifetimeManager(),
                new InjectionConstructor(connectionString));

            // TODO: Register your type's mappings here.
            // container.RegisterType<IProductRepository, ProductRepository>();
        }
    }
}